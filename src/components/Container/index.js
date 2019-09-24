import styled from 'styled-components/native';
import is from 'styled-is';

const Container = styled.View`
  ${is('flex')`
    flex: ${props => props.flex};
  `};

  ${is('borderTop')`
    borderTopLeftRadius: ${props => props.borderTop};
    borderTopRightRadius: ${props => props.borderTop};
  `};

  ${is('absolute')`
    position: absolute
  `};

  ${is('bottom')`
    bottom: 0
  `};

  ${is('bgColor')`
    background-color: ${props => props.bgColor};
  `};

  ${is('height')`
    height: ${props => props.height};
  `};

  ${is('width')`
    width: ${props => props.width};
  `};

  ${is('center')`
    align-items: center;
    justify-content: center;
  `};

  ${is('padding')`
    padding: ${props => props.padding}px;
  `};

  ${is('paddingHorizontal')`
    paddingHorizontal: ${props => props.paddingHorizontal}px;
  `};

  ${is('paddingVertical')`
    paddingVertical: ${props => props.paddingVertical}px;
  `};

  ${is('marginHorizontal')`
    marginHorizontal: ${props => props.marginHorizontal}px;
  `};

  ${is('marginVertical')`
    marginVertical: ${props => props.marginVertical}px;
  `};
`;

Container.defaultProps = {
  'background-color': '#EEF1F7',
  width: '100%',
};

export default Container;
