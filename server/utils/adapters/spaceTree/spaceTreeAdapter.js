
const listAdapter = (list) => ({
  id: list.id,
  name: list.name,
  task_count: list.task_count,
})

export const spaceTreeAdapter = {
  toClient([{ folders }, { lists }]) {
    return [
      ...(folders || []).map((folder) => ({
        id: folder.id,
        name: folder.name,
        task_count: folder.task_count,
        lists: (folder.lists || []).slice(0, 1).map(listAdapter),
      })),
      ...(lists || []).map(listAdapter),
    ]
  },
};


