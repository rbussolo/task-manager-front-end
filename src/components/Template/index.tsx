import { Header } from "../Header";

interface TemplateProps {
  children: JSX.Element | JSX.Element[];
}

function Template({ children }: TemplateProps) {
  return (
    <>
      <Header />

      {children}
    </>
  )
}

export { Template }