import { v4 as uuidv4 } from "uuid"
import TextInput from "./TextInput"
// import TextArea from "./TextArea"
import Heading from "./Heading"
import Button from "./Button"
// import CheckBox from "./CheckBox"

export interface ItemProps {
    id: string,
    component: React.FunctionComponent<{isDragging?: boolean; style?: any; innerRef?: any;}>
}

export const items = [
    {
        id: uuidv4(),
        component: TextInput
    },
    // {
    //     id: uuidv4(),
    //     component: TextArea
    // },
    {
        id: uuidv4(),
        component: Button
    },
    {
        id: uuidv4(),
        component: Heading
    },
    // {
    //     id: uuidv4(),
    //     component: CheckBox
    // }
];

export default items
