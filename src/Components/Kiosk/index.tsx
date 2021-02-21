import * as React from "react";
import {
    Droppable,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot
} from "react-beautiful-dnd"
import styled from "@emotion/styled"

import items from "../example_data"

const Kiosk = ({addContainer, dumpState}: { addContainer: () => void, dumpState: () => void }) => {
    return (
        <React.Fragment>
            <div
                className="flex gap-2 mx-auto py-2"
            >
                <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={addContainer}
                >
                    Add Container
                </button>
                <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={dumpState}
                >
                    Dump State
                </button>
            </div>
            <Droppable
                droppableId="KIOSK"
                isDropDisabled
            >
                {(droppableProvided, snapshot) => (
                    <div
                        ref={droppableProvided.innerRef}
                        style={{
                            minHeight: "32px"
                        }}
                        className={`
                            divide-y divide-gray-200
                            bg-white py-1 rounded flex flex-col gap-1 flex-1
                            ${snapshot.isDraggingOver ? "border-dashed border-black" : "border-solid border-gray-300"}
                        `}
                    >
                        <ul className="divide-y divide-gray-200">
                            {items.map((item, index) => {
                                const Component = item.component;
                                return (
                                    <li className="py-4 flex" key={item.id}>
                                        <div className="ml-3">
                                            <Draggable
                                                draggableId={`${item.id}`}
                                                index={index}
                                                disableInteractiveElementBlocking
                                            >
                                                {(draggableProvided: DraggableProvided, draggableSnapshot: DraggableStateSnapshot) => (
                                                    <React.Fragment>
                                                        <Component
                                                            innerRef={draggableProvided.innerRef}
                                                            {...draggableProvided.draggableProps}
                                                            {...draggableProvided.dragHandleProps}
                                                            isDragging={draggableSnapshot.isDragging}
                                                            style={{
                                                                ...draggableProvided.draggableProps.style,
                                                                transform: draggableSnapshot.isDragging ? draggableProvided.draggableProps.style?.transform : 'translate(0px, 0px)',
                                                            }}
                                                        />
                                                        {draggableSnapshot.isDragging && <Component />}
                                                    </React.Fragment>
                                                )}
                                            </Draggable>
                                        </div>
                                    </li>
                                );
                            })}
                            {droppableProvided.placeholder}
                        </ul>
                    </div>
                )}
            </Droppable>
        </React.Fragment>
    );
}

export default Kiosk