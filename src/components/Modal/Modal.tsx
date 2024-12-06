import { useRef, ReactNode, useEffect } from "react";
import "./Modal.scss";

type Props = {
  children: ReactNode;
  closeModal?: () => void;
};

function Modal({ children, closeModal }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function onShow() {
    dialogRef.current?.showModal();
  }
  console.log(closeModal);

  // function onClose() {
  //   dialogRef.current?.close();
  // }

  useEffect(() => {
    onShow();
  }, []);

  return (
    <>
      <dialog className="Modal__dialog" ref={dialogRef}>
        {closeModal && (
          <div className="Modal__fechar" onClick={closeModal}>
            X
          </div>
        )}
        <div>{children}</div>
      </dialog>
    </>
  );
}

export default Modal;
