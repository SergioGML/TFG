import { InformationCircleIcon } from "@heroicons/react/24/outline";

function Info({ text }: { text: string }) {
  return (
    <div>
      <div className="mt-4 flex items-start gap-3 text-slate-800 dark:text-slate-200 bg-yellow-200 dark:bg-yellow-600 p-4 rounded-md text-justify w-fit">
        <InformationCircleIcon className="w-8 h-8  shrink-0 text-slate-800 dark:text-slate-200" />

        <p className="max-w-md text-start">{text}</p>
      </div>
    </div>
  );
}

export default Info;
