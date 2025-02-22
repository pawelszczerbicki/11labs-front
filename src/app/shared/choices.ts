export const choicesOptions = {
  classNames: {
    containerInner: "form-control",
    input: 'form-control',
    inputCloned: 'form-control-sm',
    listDropdown: 'dropdown-menu',
    itemChoice: 'dropdown-item',
    activeState: 'show',
    selectedState: 'active',
  },
  callbackOnCreateTemplates: function (template: any) {
    return {
      // @ts-ignore
      choice: ({classNames}, data) => {
        const classes = `${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}`;
        const disabled = data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable';
        const role = data.groupId > 0 ? 'role="treeitem"' : 'role="option"';

        const label =
          data.customProperties && data.customProperties.avatarSrc
            ? `
            <div class="avatar avatar-xs me-3">
              <img class="avatar-img rounded-circle" src="${data.customProperties.avatarSrc}" alt="${data.label}" >
            </div> ${data.label}
          `
            : data.label;

        return template(`
            <div class="${classes}" data-choice ${disabled} data-id="${data.id}" data-value="${data.value}" ${role}>
              ${label}
            </div>
          `);
      },
    };
  },
}
