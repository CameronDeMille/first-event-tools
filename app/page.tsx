"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  RepeatIcon,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

type ScheduleItem = {
  time: string;
  description: string;
  duration?: number;
  isQualificationMatches?: boolean;
};

// TODO: Move code into hooks and components
export default function FTCEventScheduleBuilder() {
  const [teams, setTeams] = useState(10);
  const [cycleTime, setCycleTime] = useState(5);
  const [matchesPerTeam, setMatchesPerTeam] = useState(5);
  const [qualificationMatchesTableOpen, setQualificationMatchesTableOpen] =
    useState(false);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { time: "07:00", description: "Volunteer Check-In" },
    { time: "07:30", description: "Teams Check-In" },
    { time: "08:00", description: "Judging Begins, Driver & Field Inspection" },
    { time: "10:30", description: "Driver meeting" },
    { time: "10:45", description: "Opening Ceremony" },
    {
      time: "11:00",
      description: "Qualifying matches",
      isQualificationMatches: true,
    },
    { time: "12:30", description: "Lunch break" },
    { time: "13:55", description: "Alliance Selection Starts" },
    { time: "14:10", description: "Semifinals" },
    { time: "14:35", description: "Finals" },
    { time: "14:55", description: "Finals end" },
    { time: "15:10", description: "Award Ceremony Begins" },
    { time: "15:40", description: "Award Ceremony Ends" },
  ]);

  const calculateResult = (t: number, c: number, m: number) => {
    const totalMatches = Math.ceil((t * m) / 2);
    return Number(((totalMatches * c) / 60).toFixed(2));
  };

  const result = useMemo(
    () => calculateResult(teams, cycleTime, matchesPerTeam),
    [teams, cycleTime, matchesPerTeam]
  );

  useEffect(() => {
    setSchedule((prevSchedule) => {
      const updatedSchedule = [...prevSchedule];
      const qualMatchIndex = updatedSchedule.findIndex(
        (item) => item.isQualificationMatches
      );
      if (qualMatchIndex !== -1) {
        updatedSchedule[qualMatchIndex].duration = result;
      }
      return updatedSchedule;
    });
  }, [result]);

  const generateTableData = () => {
    const teamOptions = Array.from({ length: 31 }, (_, i) => i + 10);
    const cycleTimeOptions = Array.from({ length: 13 }, (_, i) => i * 0.5 + 4);
    const matchesPerTeamOptions = [5, 6];

    return teamOptions.map((t) => ({
      teams: t,
      results: cycleTimeOptions.map((c) => ({
        cycleTime: c,
        results: matchesPerTeamOptions.map((m) => ({
          matchesPerTeam: m,
          result: calculateResult(t, c, m),
          isHighlighted: t === teams && c === cycleTime && m === matchesPerTeam,
        })),
      })),
    }));
  };

  const tableData = useMemo(
    () => generateTableData(),
    [teams, cycleTime, matchesPerTeam]
  );

  const teamRanges = [
    { label: "10-20", teams: tableData.slice(0, 11) },
    { label: "21-30", teams: tableData.slice(11, 21) },
    { label: "31-40", teams: tableData.slice(21) },
  ];

  const addScheduleItem = () => {
    setSchedule([...schedule, { time: "", description: "" }]);
  };

  const updateScheduleItem = (
    index: number,
    field: "time" | "description",
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  const removeScheduleItem = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const calculateEndTime = (startTime: string, durationHours: number) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + durationHours * 60;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <ModeToggle />
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            FTC Event Schedule Builder
          </CardTitle>
          <CardDescription>
            Plan your FIRST Tech Challenge event schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="teams" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Number of Teams
              </Label>
              <Input
                id="teams"
                type="number"
                value={teams}
                onChange={(e) =>
                  setTeams(Math.max(10, Math.min(40, Number(e.target.value))))
                }
                min="10"
                max="40"
                className="text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycleTime" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Cycle Time (minutes)
              </Label>
              <Select
                value={cycleTime.toString()}
                onValueChange={(value) => setCycleTime(Number(value))}
              >
                <SelectTrigger className="text-lg">
                  <SelectValue placeholder="Select cycle time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 13 }, (_, i) => (
                    <SelectItem key={i} value={(i * 0.5 + 4).toString()}>
                      {(i * 0.5 + 4).toFixed(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="matchesPerTeam"
                className="flex items-center gap-2"
              >
                <RepeatIcon className="w-4 h-4" />
                Matches per Team
              </Label>
              <Select
                value={matchesPerTeam.toString()}
                onValueChange={(value) => setMatchesPerTeam(Number(value))}
              >
                <SelectTrigger className="text-lg">
                  <SelectValue placeholder="Select matches per team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-3xl font-bold mb-8 text-center p-4 bg-primary/10 rounded-lg">
            Qualification Matches Duration:{" "}
            <span className="text-primary">{result} hours</span>
          </div>

          <Collapsible
            open={qualificationMatchesTableOpen}
            onOpenChange={setQualificationMatchesTableOpen}
            className="mb-8"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-between w-full"
              >
                <span>Qualification Matches Detailed Table</span>
                {qualificationMatchesTableOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Tabs defaultValue="10-20" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  {teamRanges.map((range) => (
                    <TabsTrigger key={range.label} value={range.label}>
                      {range.label} Teams
                    </TabsTrigger>
                  ))}
                </TabsList>
                {teamRanges.map((range) => (
                  <TabsContent key={range.label} value={range.label}>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Teams</TableHead>
                            <TableHead className="w-[120px]">
                              Cycle Time
                            </TableHead>
                            <TableHead className="w-[120px]">
                              5 Matches
                            </TableHead>
                            <TableHead className="w-[120px]">
                              6 Matches
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {range.teams.flatMap((teamRow) =>
                            teamRow.results.map((cycleRow, index) => (
                              <TableRow
                                key={`${teamRow.teams}-${cycleRow.cycleTime}`}
                              >
                                {index === 0 && (
                                  <TableCell
                                    rowSpan={teamRow.results.length}
                                    className="font-medium"
                                  >
                                    {teamRow.teams}
                                  </TableCell>
                                )}
                                <TableCell>
                                  {cycleRow.cycleTime.toFixed(1)}
                                </TableCell>
                                {cycleRow.results.map((matchRow) => (
                                  <TableCell
                                    key={`${teamRow.teams}-${cycleRow.cycleTime}-${matchRow.matchesPerTeam}`}
                                    className={
                                      matchRow.isHighlighted
                                        ? "bg-primary/20 font-bold"
                                        : ""
                                    }
                                  >
                                    {matchRow.result}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CollapsibleContent>
          </Collapsible>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Event Schedule</h3>
            {schedule.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <Input
                  type="time"
                  value={item.time}
                  onChange={(e) =>
                    updateScheduleItem(index, "time", e.target.value)
                  }
                  className="w-32"
                />
                <Input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    updateScheduleItem(index, "description", e.target.value)
                  }
                  className="flex-grow"
                  placeholder="Event description"
                />
                {item.isQualificationMatches && (
                  <div className="text-sm font-medium">
                    Duration: {item.duration?.toFixed(2)} hours
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeScheduleItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addScheduleItem} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Schedule Item
            </Button>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Final Schedule</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((item, index) => {
                  const nextItem = schedule[index + 1];
                  const duration = item.isQualificationMatches
                    ? item.duration
                    : nextItem
                    ? ((new Date(`2000/01/01 ${nextItem.time}`) as any) -
                        (new Date(`2000/01/01 ${item.time}`) as any)) /
                      3600000
                    : undefined;
                  const endTime = duration
                    ? calculateEndTime(item.time, duration)
                    : undefined;
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.time}</TableCell>
                      <TableCell>{endTime}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{duration?.toFixed(2)} hours</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
