export function normalizeMateWheel(source) {
  const styles = source.styles || [];
  const families = source.families || [];

  const descriptorIndex = {};
  const seenIds = new Set();

  const processDescriptor = (desc, familyId) => {
    if (seenIds.has(desc.id)) {
      throw new Error(`Duplicate descriptor id found: ${desc.id}`);
    }
    seenIds.add(desc.id);

    const nodeStyles = desc.styles || [];

    descriptorIndex[desc.id] = {
      id: desc.id,
      label: desc.label,
      familyId,
      polarity: desc.polarity,
      styles: nodeStyles,
      aliases: desc.aliases,
      tooltip: desc.tooltip,
      notes: desc.notes
    };

    const node = {
      id: desc.id,
      name: desc.label,
      meta: {
        polarity: desc.polarity,
        styles: nodeStyles,
        intensityRange: desc.intensityRange,
        tooltip: desc.tooltip
      }
    };

    if (desc.children && desc.children.length > 0) {
      node.children = desc.children.map((child) => processDescriptor(child, familyId));
    } else {
      node.value = 1;
    }

    return node;
  };

  const sunburstChildren = families.map((fam) => {
    if (seenIds.has(fam.id)) {
      throw new Error(`Duplicate family id found: ${fam.id}`);
    }
    seenIds.add(fam.id);

    if (!fam.descriptors || fam.descriptors.length === 0) {
      throw new Error(`Family ${fam.id} is empty. Wheel requires all families to have descriptors.`);
    }

    descriptorIndex[fam.id] = {
      id: fam.id,
      label: fam.label,
      familyId: fam.id,
      styles: [],
      isFamily: true
    };

    return {
      id: fam.id,
      name: fam.label,
      itemStyle: { color: fam.color },
      children: fam.descriptors.map((desc) => processDescriptor(desc, fam.id))
    };
  });

  const sunburst = {
    id: 'root',
    name: 'Mate Wheel',
    children: sunburstChildren
  };

  return {
    sunburst,
    descriptorIndex,
    styles
  };
}

export function toSunburstTree(model) {
  return model.sunburst;
}

export function toDescriptorIndex(model) {
  return Object.values(model.descriptorIndex);
}
