export default {
    namespaced: true,
    state: {
        objects: [
            {
                title: 'Level: 1, Item id: 0',
                level: 1,
                indeterminate: false,
                selected: false,
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
                title: `Level: 1, Item id: ${state.objects.length}`,
                level: 1,
                indeterminate: false,
                selected: false,
                id: state.objects.length,
                child: []
            })
        },
        ADD_NEW_CHILD_OBJECT(state, object) {
            object.child.push({
                title: `Level: ${object.level + 1} Parent id: ${object.id}, Item id: ${object.child.length}`,
                level: object.level + 1,
                indeterminate: false,
                parentId: object.id,
                selected: object.selected,
                id: object.child.length,
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
        SET_CHILD_STATUS(state, query) {
            if(query.status === null) query.object.indeterminate = false
            query.object.selected = query.status
            if(query.object.child.length) recursiveChecked(query.status, query.object.child)
            recursiveIndeterminate(state.objects, query.object)

            state.objects.map(function(object) {
                if(object.level === query.object.level && object.id === query.object.id) object = query.object
                return object
            })


            function recursiveChecked(checked, objects) {
                objects.map(function(object) {
                    object.selected = checked
                    object.indeterminate = false
                    if(object.child.length) recursiveChecked(checked, object.child)
                    return object
                })
            }

            function recursiveIndeterminate(objects, queryObject) {
                objects.map(function(object) {
                    if(object.level < queryObject.level) {
                        if(object.id === queryObject.parentId) {
                            if(object.child.every(object => object.selected)) {
                                object.selected = true
                                object.indeterminate = false
                            } else if(object.child.every(object => !object.selected)) {
                                object.selected = false
                                object.indeterminate = false
                            } else if(object.child.some(object => object.selected)) {
                                object.selected = false
                                object.indeterminate = true
                            }
                        }
                    }
                    recursiveIndeterminate(object.child, queryObject)
                    return object
                })
            }
        }
    },
};