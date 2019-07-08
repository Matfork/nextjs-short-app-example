/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { withRouter } from 'next/router';

const NextComposed = React.forwardRef(function NextComposed(props: any, ref) {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link: React.SFC<any> = (props: any) => {
  const {
    activeClassName,
    router,
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const className = clsx(classNameProps, {
    [activeClassName]: router
      ? router.pathname === props.href && activeClassName
      : ''
  });

  if (naked) {
    return <NextComposed className={className} ref={innerRef} {...other} />;
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      {...other}
    />
  );
};

const RouterLink = withRouter(Link);

export default React.forwardRef((props: any, ref: any) => (
  <RouterLink {...props} innerRef={ref} />
));

(NextComposed as any).propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  prefetch: PropTypes.bool
};

Link.propTypes = {
  children: PropTypes.any,
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
};

Link.defaultProps = {
  activeClassName: 'active',
  children: ''
};
