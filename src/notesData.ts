import { v4 } from "uuid";
// note의 data를 저장하는 note 배열이며
// note의 정보는 제목, 내용, tag, 색, 우선순위등의 정보가 포함되어 있다.
const notes = [
    {
        title: "Note 1 title",
        content: "Note 1 content",
        tags: [{ tag: "coding", id: v4() }],
        color: "#cce0ff",
        priority: "high",
        isPinned: true,
        isRead: false,
        date: "10/12/22 2.55 PM",
        createdTime: new Date("Sat Dec 10  2022 14:55:22").getTime(),
        editedTime: null,
        id: v4()
    },
    {
        title: "Note 2 title",
        content: "Note 2 content",
        tags: [{ tag: "exercise", id: v4() }],
        color: "#ffcccc",
        priority: "high",
        isPinned: true,
        isRead: false,
        date: "10/12/22 2.55 PM",
        createdTime: new Date("Sat Dec 10  2022 14:55:22").getTime(),
        editedTime: null,
        id: v4()
    }
]

export default notes;