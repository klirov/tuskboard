import { ref, shallowRef } from 'vue';

export type ManageMode = 'create' | 'edit';

export function useManageEntityPanel<T>() {
    const isOpen = ref(false);
    const mode = ref<ManageMode>('create');
    const editingItem = shallowRef<T | null>(null);

    function openCreate() {
        editingItem.value = null;
        mode.value = 'create';
        isOpen.value = true;
    }

    function openEdit(item: T) {
        editingItem.value = item;
        mode.value = 'edit';
        isOpen.value = true;
    }

    function close() {
        editingItem.value = null;
        isOpen.value = false;
    }

    function toggle(item?: T) {
        const isCurrentItemOpened =
            editingItem.value &&
            editingItem.value.id === (item as any).id &&
            mode.value === 'edit' &&
            isOpen.value;
            
        if (!item) {
            if (mode.value === 'create' && isOpen.value) {
                close();
            } else {
                openCreate();
            }
        } else {
            if (isCurrentItemOpened) {
                close();
            } else {
                openEdit(item);
            }
        }
    }

    return {
        isOpen,
        mode,
        editingItem,
        openCreate,
        openEdit,
        close,
        toggle,
    };
}
