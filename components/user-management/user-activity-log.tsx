"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Activity } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useHelper from "@/Helper/helper";
import type { User as UserType } from "@/types/user";
import { changeDateFormatWithTime } from "@/Helper/DateFormats";

interface ActivityLogEntry {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress: string;
  userAgent?: string;
  type: "login" | "logout" | "create" | "update" | "delete" | "view";
}

interface UserActivityLogProps {
  user: UserType;
}

export function UserActivityLog({ user }: UserActivityLogProps) {
  const [filter, setFilter] = useState<string>("all");
  // const [allActivities, setAllActivities] = useState<Array<ActivityLogEntry>>();
  const allActivities = user.activityLog || [];
  const helper = useHelper();

  // function GetActivityLogByUserId(){
  //   helper.xhr.Get(
  //     '/Logs/GetAllLogsByUserId',
  //     helper.GetURLParamString({ UserId: userId }).toString()
  //   ).then((response) => {
  //     setAllActivities(response.logs.map((item: any) => ({
  //       id: item.ActivityId,
  //       action: item.Title,
  //       description: item.Message,
  //       timestamp: item.CreatedAt,
  //       ipAddress: item.IpAddress === "::1" ? "127.0.0.1" : item.IpAddress,
  //       type: item.Type.toLowerCase()
  //     })));
  //   }).catch((error) => {
  //     console.error(error);
  //   })
  // }

  // useEffect(() => {
  //   GetActivityLogByUserId()
  // }, [])

  // Mock activity data - in a real app, this would come from an API
  const activities: ActivityLogEntry[] = [
    {
      id: "1",
      action: "User Login",
      description: "Successfully logged into the system",
      timestamp: "2024-01-20T10:30:00Z",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      type: "login",
    },
    {
      id: "2",
      action: "Animal Updated",
      description: "Updated information for Lion - Simba",
      timestamp: "2024-01-20T11:15:00Z",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      type: "update",
    },
    {
      id: "3",
      action: "Report Generated",
      description: "Generated monthly animal health report",
      timestamp: "2024-01-20T14:22:00Z",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      type: "create",
    },
    {
      id: "4",
      action: "Profile Viewed",
      description: "Viewed zoo profile for Lahore Zoo",
      timestamp: "2024-01-20T15:45:00Z",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      type: "view",
    },
  ];

  const filteredActivities =
    filter === "all"
      ? allActivities
      : allActivities.filter((activity) => activity.Type === filter);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "login":
      case "logout":
        return <User className="h-4 w-4" />;
      case "create":
      case "update":
      case "delete":
        return <Activity className="h-4 w-4" />;
      case "view":
        return <Clock className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "login":
        return "bg-green-100 text-green-800";
      case "logout":
        return "bg-gray-100 text-gray-800";
      case "create":
        return "bg-blue-100 text-blue-800";
      case "update":
        return "bg-yellow-100 text-yellow-800";
      case "delete":
        return "bg-red-100 text-red-800";
      case "view":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Activity Log</span>
            </CardTitle>
            <CardDescription className="mt-1.5">
              Recent user activities and system interactions
            </CardDescription>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter activities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              {[...new Set(allActivities.map((a) => a.Type))].map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
              {/* <SelectItem value="login">Login/Logout</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="view">View</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="space-y-2">
          {filteredActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 border rounded-lg"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  {getActivityIcon(activity.Type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  {/* <h4 className="font-medium">{activity.action}</h4> */}
                  <Badge className={getActivityColor(activity.Type)}>
                    {activity.Type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.Message}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{changeDateFormatWithTime(activity.CreatedAt)}</span>
                  </span>
                  <span>IP: {activity.IpAddress}</span>
                </div>
              </div>
            </div>
          ))}
          {/* {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{activity.action}</h4>
                  <Badge className={getActivityColor(activity.type)}>{activity.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(activity.timestamp).toLocaleString()}</span>
                  </span>
                  <span>IP: {activity.ipAddress}</span>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </CardContent>
    </Card>
  );
}
