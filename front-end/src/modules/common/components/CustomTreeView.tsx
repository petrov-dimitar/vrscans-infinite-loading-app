import React from 'react';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CustomTreeView = ({ renderData }) => {
  const Label = ({ name = 'null', value }) => {
    return (
      <>
        {name && <span style={{ color: 'purple' }}>{name}</span>}
        <span style={{ color: 'purple' }}>{`: `}</span>
        {value !== undefined && (
          <span style={{ color: 'red' }}>{value === null ? 'null' : String(value)}</span>
        )}
      </>
    );
  };

  const treeRender = (data) => {
    const result = [];
    if (data) {
      for (const [name, value] of Object.entries(data)) {
        if (typeof value === 'object' && value !== null) {
          const children = value;
          result.push(
            <TreeItem nodeId={name} label={<Label name={name} />} key={name}>
              {treeRender(children)}
            </TreeItem>
          );
        } else {
          result.push(
            <TreeItem
              nodeId={name}
              label={<Label name={name} value={value} />}
              key={name}
            ></TreeItem>
          );
        }
      }
    }

    return result;
  };

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderData && treeRender(renderData)}
    </TreeView>
  );
};

export default CustomTreeView;
