const prepareColumns = (values = []) => (
  values.map(v => {
    return {
      ...v,
      asignee: v.asignee ? v.asignee.username : '',
      reporter: v.reporter ? v.reporter.username : '',
    }
  })
);

export default prepareColumns;