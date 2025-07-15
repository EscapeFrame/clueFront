import styled from '@emotion/styled';

export const Table = styled.table`
  border: 0.063rem #a39485 solid;
  font-size: 1rem;
  box-shadow: 0 0.125rem 0.313rem rgba(0, 0, 0, 0.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 0.313rem;
  overflow: hidden;
  height: 15.4rem;
  padding: 1.6rem;

  th {
    text-align: center;
    padding: 0.375rem 0.75rem;
    vertical-align: middle;
    font-weight: bold;
    color: black;
    background: #B7DAFF;
  }

  td {
    padding: 1rem 1.875rem 1rem 1.875rem;
    vertical-align: middle;
    border-bottom: 0.063rem solid rgba(0, 0, 0, 0.1);
    background: #fff;
    text-align: center;
    white-space: nowrap;
  }

  @media all and (max-width: 48rem) {
    &,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    th {
      text-align: right;
      border-bottom: 0.063rem solid #a39485;
    }

    & {
      width: 35.625rem;
      height: 15.313rem;
      position: relative;
      padding-bottom: 0;
      border: none;
      box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.2);
    }

    thead {
      float: left;
      white-space: nowrap;
    }

    tbody {
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      white-space: nowrap;
    }

    tr {
      display: inline-block;
      vertical-align: top;
    }

    td {
      border-bottom: 0.063rem solid #e5e5e5;
    }
  }
`;

export const TdSmaller = styled.td`
  padding: 0.5rem 1.063rem;
`;
  