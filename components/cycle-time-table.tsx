'use client'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function CycleTimeTable() {
  const [qualificationMatchesTableOpen, setQualificationMatchesTableOpen] =
    useState(false)

  const calculateResult = (t: number, c: number, m: number) => {
    const totalMatches = Math.ceil((t * m) / 2)
    return Number(((totalMatches * c) / 60).toFixed(2))
  }

  const tableData = useMemo(() => {
    const teamOptions = Array.from({ length: 31 }, (_, i) => i + 10)
    const cycleTimeOptions = Array.from({ length: 13 }, (_, i) => i * 0.5 + 4)
    const matchesPerTeamOptions = [5, 6]

    return teamOptions.map((t) => ({
      teams: t,
      results: cycleTimeOptions.map((c) => ({
        cycleTime: c,
        results: matchesPerTeamOptions.map((m) => ({
          matchesPerTeam: m,
          result: calculateResult(t, c, m),
        })),
      })),
    }))
  }, [])

  const teamRanges = [
    { label: '10-20', teams: tableData.slice(0, 11) },
    { label: '21-30', teams: tableData.slice(11, 21) },
    { label: '31-40', teams: tableData.slice(21) },
  ]

  return (
    <>
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
                        <TableHead className="w-[120px]">Cycle Time</TableHead>
                        <TableHead className="w-[120px]">5 Matches</TableHead>
                        <TableHead className="w-[120px]">6 Matches</TableHead>
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
                              >
                                {matchRow.result}
                              </TableCell>
                            ))}
                          </TableRow>
                        )),
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}
