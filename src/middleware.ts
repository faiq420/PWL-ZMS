import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const TOKEN_KEY = "auth_token"; // same as your cookieToken.ts
type RoleAccessRules = Record<number, string[]>;

// Role → allowed routes
const ACCESS_MATRIX: RoleAccessRules = {
  1: ["/home", "/dashboard"],
  2: ["/settings"],
};

// Public/unprotected routes
const PUBLIC_PATHS = ["/", "/unauthorized"];
const STATIC_PREFIXES = [
  "/_next",
  "/api/auth",
  "/favicon.ico",
  "/images",
  "/fonts",
  "/assets",
];

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  if (STATIC_PREFIXES.some((p) => pathname.startsWith(p)))
    return NextResponse.next();

  const cookie = req.cookies.get(TOKEN_KEY)?.value;
  if (!cookie) return NextResponse.redirect(`${origin}/unauthorized`);

  let decoded: any;
  try {
    decoded = jwt.decode(cookie);

    if (!decoded) throw new Error("Invalid token");
  } catch {
    return NextResponse.redirect(`${origin}/unauthorized`);
  }

  if (decoded.exp && decoded.exp * 1000 < Date.now()) {
    return NextResponse.redirect(`${origin}`);
  }

  const role = Number(decoded.roleId);
  if (isNaN(role)) return NextResponse.redirect(`${origin}/unauthorized`);

  const allowed = ACCESS_MATRIX[role] ?? [];
  const permitted = allowed.some((route) => pathname.startsWith(route));

  if (!permitted) return NextResponse.redirect(`${origin}/unauthorized`);

  // 🚀 All good
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
