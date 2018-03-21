import * as React from 'react';
import { shouldUpdate } from 'recompose';
import styled from 'styled-components';
import { GridElement } from './engine/types';

interface CellProps {
  isAlive: GridElement;
  className?: string;
  onClick: () => void;
}

const Cell = ({ className, onClick }: CellProps) => (
  <div className={className} onClick={onClick} />
);

const StyledCell = styled<CellProps>(Cell)`
  background: ${props => props.isAlive ? '#333' : '#fff'};
  width: 30px;
  height: 30px;
  border: 1px solid #999;
`;

const FinalCell: React.StatelessComponent<CellProps> = ({ isAlive, onClick }) => (
  <StyledCell {...{ isAlive, onClick }} />
);

export default shouldUpdate(
  (props, nextProps) => (
    nextProps.isAlive !== props.isAlive
  )
)(FinalCell);
