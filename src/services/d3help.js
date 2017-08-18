const defaultColour = 'rgba(255, 255, 255, 0.5)'

export function buildAxis (root, axisGenerator, colour = defaultColour) {
  const axis = root.append('g').call(axisGenerator)
  const groups = axis.selectAll('g')

  axis.select('path').attr('stroke', colour)
  groups.selectAll('line').attr('stroke', colour)
  groups.selectAll('text').attr('fill', colour)

  return axis
}
