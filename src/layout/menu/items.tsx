import { menuItems } from './menu';
import { DraggableElementItem } from './draggable-element';
import { DraggableStructure } from './draggable-structure';

export function ElementItemsMenu() {
  return (
    <div className="absolute left-0 z-10 flex flex-col gap-2 p-4">
      <div className="bg-muted relative rounded-lg p-2 shadow-lg">
        <DraggableStructure />
      </div>

      <div className="bg-muted relative flex flex-col gap-2 rounded-lg p-2 shadow-lg">
        {menuItems.map((i) => (
          <DraggableElementItem
            key={i.title}
            type={i.type}
            blockType={i.blockType}
            icon={i.icon}
            title={i.title}
          />
        ))}
      </div>
    </div>
  );
}
