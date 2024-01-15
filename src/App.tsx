import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Header from "./components/Header";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { initialImageData } from "./data";
import cn from "./utils/cn";
import ImageCard from "./components/ImageCard";

const App = () => {
  const [galleryImages, setGalleryImages] = useState(initialImageData);

  const mouseSensor = useSensor(MouseSensor);
  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor
  );

  const handleDragStart = (e: DragStartEvent) => {
    console.log("from handle Start ", e);
  };
  const handleDragEnd = (e: DragEndEvent) => {
    console.log("from handle end ", e);
    const { active, over } = e;
    if (!over) return;

    if (active.id !== over.id) {
      setGalleryImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className={cn("min-h-screen h-full flex justify-center items-center")}>
      <div className={cn("bg-white rounded-lg p-4 md:p-8 max-w-6xl w-full")}>
        <Header />
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext items={galleryImages} strategy={rectSortingStrategy}>
            <div className={cn("grid grid-cols-2 md:grid-cols-5 gap-8 ")}>
              {galleryImages.map((image) => (
                <ImageCard {...image} key={image.id} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default App;
