"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from '@/components/ui/label';

const FILTERS = [
  {
    "title": "Selections",
    "options": [
      {
        "label": "Discounted",
        "count": 1
      },
      {
        "label": "New product",
        "count": 7
      }
    ]
  },
  {
    "title": "Prestashop Compatibility",
    "options": [
      {
        "label": "1.6.0",
        "count": 7
      },
      {
        "label": "1.6.1",
        "count": 7
      },
      {
        "label": "1.7.0",
        "count": 7
      },
      {
        "label": "1.7.1",
        "count": 7
      },
      {
        "label": "1.7.2",
        "count": 7
      },
      {
        "label": "1.7.3",
        "count": 7
      },
      {
        "label": "1.7.4",
        "count": 7
      },
      {
        "label": "1.7.5",
        "count": 7
      },
      {
        "label": "1.7.6",
        "count": 7
      },
      {
        "label": "1.7.7",
        "count": 7
      },
      {
        "label": "1.7.8",
        "count": 7
      },
      {
        "label": "8.0",
        "count": 7
      },
      {
        "label": "8.1",
        "count": 7
      },
      {
        "label": "8.2",
        "count": 7
      }
    ]
  },
  {
    "title": "Languages",
    "options": [
      {
        "label": "Arabic",
        "count": 7
      },
      {
        "label": "Czech",
        "count": 7
      },
      {
        "label": "Danish",
        "count": 7
      },
      {
        "label": "Dutch",
        "count": 7
      },
      {
        "label": "English",
        "count": 7
      },
      {
        "label": "French",
        "count": 7
      },
      {
        "label": "German",
        "count": 7
      },
      {
        "label": "Italian",
        "count": 7
      },
      {
        "label": "Polish",
        "count": 7
      },
      {
        "label": "Portuguese",
        "count": 7
      },
      {
        "label": "Romanian",
        "count": 7
      },
      {
        "label": "Russian",
        "count": 7
      },
      {
        "label": "Spanish",
        "count": 7
      },
      {
        "label": "Swedish",
        "count": 7
      }
    ]
  }
];

export default function ProductFilters() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (optionLabel: string) => {
    setSelectedFilters(prev => 
      prev.includes(optionLabel) 
        ? prev.filter(f => f !== optionLabel)
        : [...prev, optionLabel]
    );
  };

  return (
    <Card className="w-full mt-8 overflow-hidden p-0 gap-0">
      <CardHeader className="bg-theme-light-blue px-6 py-4 border-b border-theme-gray-100 rounded-t-xl">
        <CardTitle className="text-[18px] font-medium text-theme-gray-900">Filter By</CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {FILTERS.map((filter, index) => {
          const filterContent = (
            <div className="flex flex-col gap-3 pr-4">
              {filter.options.map((option) => (
                <Label 
                  key={option.label}
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFilter(option.label);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedFilters.includes(option.label)}
                      className="border-theme-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span className="text-[14px] text-theme-gray-700 group-hover:text-primary transition-colors">
                      {option.label}
                    </span>
                  </div>
                  <span className="text-[13px] text-theme-gray-500">
                    ({option.count})
                  </span>
                </Label>
              ))}
            </div>
          );

          return (
            <div key={filter.title} className={cn("mb-8", index === FILTERS.length - 1 ? "mb-0" : "")}>
              <h4 className="text-[15px] font-semibold text-theme-gray-600 mb-4">{filter.title}</h4>
              
              {filter.options.length > 5 ? (
                <ScrollArea className="h-55">
                  {filterContent}
                </ScrollArea>
              ) : (
                filterContent
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
