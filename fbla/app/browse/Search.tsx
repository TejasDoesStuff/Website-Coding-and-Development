"use client";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Slider } from "@/components/ui/slider";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [hours, setHours] = useState<number[]>([
    parseInt(searchParams.get('minHours') || '0'),
    parseInt(searchParams.get('maxHours') || '40')
  ]);
  const debouncedQuery = useDebounce(query, 300);
  const debouncedHours = useDebounce(hours, 300);

  // Update URL when search query or hours change
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }
    
    // Add hours filter parameters
    params.set('minHours', debouncedHours[0].toString());
    params.set('maxHours', debouncedHours[1].toString());
    
    // Reset to page 1 when search changes
    params.set('page', '1');
    
    router.push(`/browse?${params.toString()}`);
  }, [debouncedQuery, debouncedHours]);

  return (
    <div className="w-screen bg-background flex flex-col items-center">
      <div className="w-full p-8 flex flex-col items-center justify-center gap-6">
        <div className="rounded-xl w-full lg:w-1/2 p-2 text-2xl flex justify-center items-center ml-6">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-xl w-full p-2 text-lg bg-gray-200 text-black"
          />
          <MdSearch className="text-gray-500 relative right-10"/>
        </div>
        
        {/* Hours filter */}
        <div className="w-full lg:w-1/2 px-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Hours per week: {hours[0]} - {hours[1]}</span>
          </div>
          <Slider
            defaultValue={hours}
            max={40}
            min={0}
            step={1}
            value={hours}
            onValueChange={setHours}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
