import { Modal, Input, Button, Select } from "antd";
import type { Lessons } from "@types";
import { useState } from "react";

const { TextArea } = Input;

interface LessonModalProps {
  lesson: Lessons | null;
  open: boolean;
  onClose: () => void;
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const LessonModal = ({ lesson, open, onClose, 
 }: LessonModalProps) => {
  const [editableLesson, setEditableLesson] = useState<Lessons>(lesson || {} as Lessons);
  const [isSaving, setIsSaving] = useState(false);
console.log(setIsSaving);
  const handleStatusChange = (value: string) => {
    setEditableLesson(prev => ({ ...prev, status: value }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableLesson(prev => ({ ...prev, notes: e.target.value }));
  };


  if (!lesson) return null;

  return (
    <Modal
      title={`Lesson ${lesson.id}: ${lesson.title}`}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          onClick={onClose}
          loading={isSaving}
          disabled={isSaving}
        >
          Save
        </Button>,
      ]}
      width={600}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-600">Title</h4>
            <p className="text-lg">{lesson.title}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600">Date</h4>
            <p>{lesson.date}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600">Status</h4>
          <Select
            value={editableLesson.status || lesson.status}
            onChange={handleStatusChange}
            className="w-full"
            options={statusOptions}
          />
        </div>

        <div>
          <h4 className="font-semibold text-gray-600">Notes</h4>
          <TextArea
            value={editableLesson.notes || lesson.notes || ""}
            onChange={handleNotesChange}
            rows={4}
            className="w-full"
            placeholder="Add your notes here..."
          />
        </div>
      </div>
    </Modal>
  );
};