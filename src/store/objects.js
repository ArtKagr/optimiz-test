export default {
    namespaced: true,
    state: {
        objects: [
            {
                title: 'Level: 0, Item: 1',
                level: 0,
                indeterminate: false,
                allChildSelected: false,
                id: 0,
                child: [],
            },
        ],
    },
    getters: {
        getObjects: (state) => state.objects
    },
    mutations: {
        ADD_NEW_OBJECT(state) {
            state.objects.push({
                title: `Level: 0, Item: ${state.objects.length + 1}`,
                level: 0,
                indeterminate: false,
                allChildSelected: false,
                id: state.objects.length,
                child: []
            })
        },
        ADD_NEW_CHILD_OBJECT(state, object) {
            object.child.push({
                title: `Level: ${object.level + 1} Parent id: ${object.id}, Item id: ${object.child.length + 1}`,
                level: object.level + 1,
                indeterminate: false,
                allChildSelected: false,
                id: object.child.length + 1,
                child: []
            })
            state.objects.map(function(parentObject) {
                parentObject.child.map(function(childObject) {
                    if(childObject.level === object.level && childObject.id === object.id) childObject = object
                    return childObject
                })
                return parentObject
            })
        },
        REMOVE_OBJECT() {
            //
        }
    },
};