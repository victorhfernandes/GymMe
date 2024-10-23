import { useRef, ReactNode, useEffect } from "react";
import "./Modal.scss";

type Props = {
  children: ReactNode;
};

function Modal({ children }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function onShow() {
    dialogRef.current?.showModal();
  }

  function onClose() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    onShow();
  }, []);

  return (
    <>
      <dialog className="Modal__dialog" ref={dialogRef}>
        <div>{children}</div>
      </dialog>
    </>
  );
}

export default Modal;
