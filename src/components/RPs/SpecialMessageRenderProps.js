function SpecialMessageRenderProps({children}) {
  return children({
    specialMessage: 'Angular Class at 2.45pm cancelled'
  })
}

export default SpecialMessageRenderProps;
