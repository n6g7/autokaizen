import List from './List'

const DefectList = List.ordered.extend`
  align-items: flex-start;
  flex-flow: row wrap;

  li {
    flex-grow: 1;
    margin-bottom: ${p => 2 * p.theme.spacing}px;
    max-width: calc(25% - ${p => 2 * p.theme.spacing}px);
    width: 20%;
  }
`

export default DefectList
