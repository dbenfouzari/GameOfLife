import * as React from 'react';
import styled from 'styled-components';
// import { GridRow } from './engine/types';
import Cell from './Cell';

interface RowProps {
  // tslint:disable-next-line:no-any
  elms: any;
  className?: string;
  onClick: Function;
}

class Row extends React.Component<RowProps> {
  shouldComponentUpdate (nextProps: RowProps) {
    const areElmsEquals = nextProps.elms.equals(this.props.elms);
    return !areElmsEquals;
  }

  render () {
    const { elms, className, onClick } = this.props;

    return (
      <div className={className}>
        { elms.map((col, colIndex) => (
          <Cell key={colIndex} isAlive={col} onClick={onClick(colIndex)} />
        )) }
      </div>
    );
  }
}

const StyledRow = styled<RowProps>(Row)`
  display: flex;
`;

const FinalRow: React.StatelessComponent<RowProps> = ({ elms, onClick }) => (
  <StyledRow {...{ elms, onClick }} />
);

export default FinalRow;
