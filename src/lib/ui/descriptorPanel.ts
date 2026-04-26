import {
  chartEvents,
  chartIds,
  chartSelectors,
  getChartElementById,
  queryChartElement,
  type WheelNodeSelectedDetail
} from './chartContract';

export function setupDescriptorPanel(panelId = chartIds.descriptorPanel): void {
  const panel = getChartElementById(panelId);

  if (!(panel instanceof HTMLElement)) {
    return;
  }

  const indexStr = panel.dataset.index;
  const translationsStr = panel.dataset.translations;

  if (!indexStr || !translationsStr) {
    return;
  }

  const index = JSON.parse(indexStr);
  const translations = JSON.parse(translationsStr);
  const emptyState = queryChartElement(panel, chartSelectors.panelEmptyState);
  const contentState = queryChartElement(panel, chartSelectors.panelContent);
  const titleEl = queryChartElement(panel, chartSelectors.panelTitle);
  const polarityEl = queryChartElement(panel, chartSelectors.panelPolarity);
  const metaEl = queryChartElement(panel, chartSelectors.panelMeta);

  const createMetaParagraph = (
    className: string,
    value: string,
    label?: string,
  ): HTMLParagraphElement => {
    const paragraph = document.createElement('p');
    paragraph.className = className;

    if (label) {
      const strong = document.createElement('strong');
      strong.textContent = label;
      paragraph.appendChild(strong);
      paragraph.appendChild(document.createTextNode(` ${value}`));
      return paragraph;
    }

    paragraph.textContent = value;
    return paragraph;
  };

  window.addEventListener(chartEvents.wheelNodeSelected, ((event: CustomEvent<WheelNodeSelectedDetail>) => {
    const item = index[event.detail.id];

    if (!item) {
      return;
    }

    panel.classList.remove('empty');
    emptyState?.classList.add('hidden');
    contentState?.classList.remove('hidden');

    if (titleEl instanceof HTMLElement) {
      titleEl.textContent = item.label;
    }

    if (polarityEl instanceof HTMLElement) {
      polarityEl.className = `badge ${item.polarity}`;
      const polarities = translations.polarities;
      polarityEl.textContent = polarities[item.polarity as keyof typeof polarities] || item.polarity;
    }

    if (metaEl instanceof HTMLElement) {
      const fragment = document.createDocumentFragment();

      if (item.styles && item.styles.length > 0) {
        fragment.appendChild(
          createMetaParagraph('meta-styles', item.styles.join(', '), translations.typicalCode),
        );
      }

      const noteText = item.tooltip || item.notes || '';
      if (noteText) {
        fragment.appendChild(createMetaParagraph('meta-notes', noteText));
      }

      if (item.aliases && item.aliases.length > 0) {
        fragment.appendChild(
          createMetaParagraph('meta-aliases', item.aliases.join(', '), translations.alsoKnown),
        );
      }

      metaEl.replaceChildren(fragment);
      metaEl.hidden = metaEl.childElementCount === 0;
    }
  }) as EventListener);

  window.addEventListener(chartEvents.wheelNodeCleared, () => {
    panel.classList.add('empty');
    emptyState?.classList.remove('hidden');
    contentState?.classList.add('hidden');

    if (metaEl instanceof HTMLElement) {
      metaEl.hidden = true;
    }
  });
}