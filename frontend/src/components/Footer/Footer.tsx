import {
  EnvelopeIcon,
  CodeBracketSquareIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

function Footer() {
  return (
    <footer
      className="w-full h-auto px-4 py-2  
    bg-white dark:bg-blue-950/80 dark:text-white border-t dark:border-gray-700"
    >
      <section className="flex flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/SergioGML"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline text-rose-600 dark:text-slate-200 hover:transform hover:scale-105 transition-transform duration-200"
          >
            GitHub
            <CodeBracketSquareIcon className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/sergio-garcia-manzanares/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline text-rose-600 dark:text-slate-200 hover:transform hover:scale-105 transition-transform duration-200"
          >
            LinkedIn
            <AcademicCapIcon className="w-5 h-5" />
          </a>
        </div>

        <a
          href="mailto:sergiogarciamanzanares@gmail.com?subject=Hola%20Sergio&body=Me%20gustaría%20contactarte..."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline text-rose-600 dark:text-slate-200 hover:scale-105 transition-transform duration-200 cursor-pointer"
        >
          <EnvelopeIcon className="w-5 h-5" />
          <span>sergiogarciamanzanares@gmail.com</span>
        </a>
      </section>
    </footer>
  );
}

export default Footer;
