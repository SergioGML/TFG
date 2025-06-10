import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

export default function ThemeButton() {
  return (
    <section>
      <div className="flex items-center justify-center w-fit h-15 p-3 rounded-2xl gap-3 dark:bg-gray-800 cursor-pointer">
        <ComputerDesktopIcon className="size-9 text-gray-400" />
        <SunIcon className="size-9 text-gray-400" />
        <MoonIcon className="size-9 text-gray-400" />
      </div>
    </section>
  );
}
