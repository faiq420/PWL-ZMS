// "use client"

// import { useState, useEffect } from "react"

// export function RouteModal({ isOpen, onClose, onSave, route, availableZoos }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     duration: "",
//     distance: "",
//     difficulty: "Easy",
//     highlights: [""],
//     description: "",
//     recommendedTimes: [],
//     zoo: "",
//   })

//   const availableTimes = [
//     { id: "morning", label: "Morning" },
//     { id: "midday", label: "Midday" },
//     { id: "afternoon", label: "Afternoon" },
//     { id: "evening", label: "Evening" },
//     { id: "lateAfternoon", label: "Late Afternoon" },
//   ]

//   useEffect(() => {
//     if (route) {
//       setFormData({
//         ...route,
//         highlights: route.highlights.length > 0 ? route.highlights : [""],
//       })
//     } else {
//       setFormData({
//         name: "",
//         duration: "",
//         distance: "",
//         difficulty: "Easy",
//         highlights: [""],
//         description: "",
//         recommendedTimes: ["Morning"],
//         zoo: availableZoos.length > 0 ? availableZoos[0].name : "",
//       })
//     }
//   }, [route, availableZoos])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSelectChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleHighlightChange = (index, value) => {
//     const newHighlights = [...formData.highlights]
//     newHighlights[index] = value
//     setFormData((prev) => ({ ...prev, highlights: newHighlights }))
//   }

//   const addHighlight = () => {
//     setFormData((prev) => ({ ...prev, highlights: [...prev.highlights, ""] }))
//   }

//   const removeHighlight = (index) => {
//     const newHighlights = [...formData.highlights]
//     newHighlights.splice(index, 1)
//     setFormData((prev) => ({ ...prev, highlights: newHighlights }))
//   }

//   const handleTimeToggle = (time) => {
//     setFormData((prev) => {
//       const times = [...prev.recommendedTimes]
//       if (times.includes(time)) {
//         return { ...prev, recommendedTimes: times.filter((t) => t !== time) }
//       } else {
//         return { ...prev, recommendedTimes: [...times, time] }

import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  availableZoos: {
    id: number;
    name: string;
    location: string;
    status: string;
  }[];
  route: any;
  onSave: (route: any) => void;
}

const RouteModal = ({
  isOpen,
  onClose,
  onSave,
  route,
  availableZoos,
}: Props) => {
  return <div>routeRouteModal</div>;
};

export default RouteModal;
