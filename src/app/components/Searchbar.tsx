/**  @format */

import { cn } from "@/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function Searchbar(props: Props) {
  return (
    <form
      className="flex relative items-center justify-center h-10"
      onSubmit={props.onSubmit}
    >
      <input
        type="text"
        onChange={props.onChange}
        value={props.value}
        placeholder="Search location..."
        className={cn(
          "px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
        )}
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full">
        <IoSearch />
      </button>
    </form>
  );
}
