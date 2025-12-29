import Modal from "@/components/ui/Modal";
import ProjectDetailView from "@/features/work/ProjectDetailView";
import { use } from "react";

type Params = Promise<{ id: string }>;

export default function PhotoModal({ params }: { params: Params }) {
  const { id } = use(params);
  return (
    <Modal>
      <ProjectDetailView id={id} />
    </Modal>
  );
}
