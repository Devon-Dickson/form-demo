import * as React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, DraggableLocation, DraggableProvided, DraggableStateSnapshot, Droppable, DropResult } from 'react-beautiful-dnd';
import Kiosk from "../../Components/Kiosk";
import Layout from "../Layout";
import items from "../../Components/example_data"

type BlockState = Array<ItemProps>;

interface FormState {
    [index: string]: BlockState
}

interface ItemProps {
    id: string,
    component: React.FunctionComponent<{isDragging: boolean, style: any, innerRef: any}>
}

interface DroppableProps {
    isDraggingOver?: boolean,
}

const reorder = (list:BlockState, startIndex: number, endIndex: number): BlockState => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const copy = (sourceBlock: BlockState, destinationBlock: BlockState, droppableSource: DraggableLocation, droppableDestination: DraggableLocation): BlockState => {
    const sourceBlockClone = Array.from(sourceBlock);
    const destinationBlockClone = Array.from(destinationBlock);
    const item = sourceBlockClone[droppableSource.index];

    destinationBlockClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
    return destinationBlockClone;
};

const move = (prevState: FormState, sourceBlock: DraggableLocation, destinationBlock: DraggableLocation): FormState => {
    const sourceBlockClone = Array.from(prevState[sourceBlock.droppableId]);
    const destinationBlockClone = Array.from(prevState[destinationBlock.droppableId]);
    const [removed] = sourceBlockClone.splice(sourceBlock.index, 1);

    destinationBlockClone.splice(destinationBlock.index, 0, removed);

    const result = {...prevState};
    result[sourceBlock.droppableId] = sourceBlockClone;
    result[destinationBlock.droppableId] = destinationBlockClone;

    return result;
};

const deleteItem = (prevState: FormState, sourceBlock: DraggableLocation): FormState => {
    // Get the modified Block and set the other blocks aside
    const {[sourceBlock.droppableId]: modifiedBlock} = prevState

    // Splice the deleted item out of the modified Block
    modifiedBlock.splice(sourceBlock.index, 1);

    // Return the state, after overwriting the modified block
    return {
        ...prevState,
        [sourceBlock.droppableId]: modifiedBlock
    }
}

const FormBuilder = () => {
    const [state, setState] = useState<FormState>({
        [uuidv4()]: []
    })

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            // If the destination is the same as the source, we're re-ordering the Block
            case destination.droppableId:
                setState((prevState: FormState) => ({
                    ...prevState,
                    [destination.droppableId]: reorder(
                        prevState[source.droppableId],
                        source.index,
                        destination.index
                    )
                }));
                break;
            // If the source is the Kios, we're copying it into a block
            case 'KIOSK':
                if (destination.droppableId === "DELETE") {
                    break;
                } else {
                    setState((prevState: FormState) => ({
                        ...prevState,
                        [destination.droppableId]: copy(
                            items,
                            prevState[destination.droppableId],
                            source,
                            destination
                        )
                    }));
                }
                break;
            // Otherwise, we're moving the component between two different blocks OR deleting it
            default:
                if (destination.droppableId === "DELETE") {
                    setState((prevState: FormState) => deleteItem(
                        prevState,
                        source,
                    ));
                } else {
                    setState((prevState: FormState) => move(
                        prevState,
                        source,
                        destination
                    ));
                }
                break;
        }
    }

    const dumpState = () => {
        console.log(state)
    }

    const addContainer = () => {
        setState((prevState: FormState) => ({ ...prevState, [uuidv4()]: [] }));
    }

    return (
        <Layout>
            <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
                <DragDropContext onDragEnd={onDragEnd}>
                    {/* <!-- Primary column --> */}
                    <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last">
                        <div className={`flex flex-col m-auto gap-4 w-96`}>
                            {Object.keys(state).map((blockId, index) => (
                                <React.Fragment>
                                     <p><strong>{index + 1}</strong>: Block {blockId.slice(-4).toUpperCase()}</p>
                                    <Droppable
                                        key={blockId}
                                        droppableId={blockId}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                className={`
                                                    bg-gray-300 py-2 px-2 rounded justify-center flex flex-col gap-2
                                                    ${snapshot.isDraggingOver ? "border-dashed border-black" : "border-solid border-gray-300"}
                                                `}
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {state[blockId].map(
                                                        (item: ItemProps, index: number) => {
                                                            const Component: React.FunctionComponent<{isDragging: boolean, style: any, innerRef: any}> = item.component
                                                            return (
                                                                <Draggable
                                                                    key={item.id}
                                                                    draggableId={`${item.id}`}
                                                                    index={index}
                                                                    disableInteractiveElementBlocking
                                                                >
                                                                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                                        <Component
                                                                            innerRef={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            isDragging={snapshot.isDragging}
                                                                            style={provided.draggableProps.style}
                                                                        />
                                                                    )}
                                                                </Draggable>
                                                            )
                                                        }
                                                    )
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </React.Fragment>
                            ))}
                            <Droppable
                                key={"DELETE"}
                                droppableId={"DELETE"}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        className={`flex items-center content-center justify-center p-2 border border-solid border-transparent text-gray-400 ${snapshot.isDraggingOver ? "border-dashed border-black" : "border-solid border-gray-300"}`}
                                        ref={provided.innerRef}

                                    >
                                        {provided.placeholder}
                                        Drop here to Delete
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </section>

                    {/* <!-- Secondary column (hidden on smaller screens) --> */}
                    <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
                        <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
                            <Kiosk
                                addContainer={addContainer}
                                dumpState={dumpState}
                            />
                        </div>
                    </aside>
                </DragDropContext>
            </main>
        </Layout>
    );
}

export default FormBuilder;
