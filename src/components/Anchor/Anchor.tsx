import { ReactNode } from "react";
import "./Anchor.css";

interface Props {
  href: string;
  className: string;
  children?: ReactNode;
}

function A({ href, children, className }: Props) {
  return (
    <a className={`anchor ${className}`} href={href} target="_blank">
      {children}
    </a>
  );
}

export default A;
