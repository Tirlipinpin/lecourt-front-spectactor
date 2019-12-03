import React, { Suspense } from 'react';
import { Loader } from 'designSystem';

export const lazyRenderer = (Child: any, props: any, className?: any) => (
  <Suspense fallback={<Loader size="3vw" className={className} />}>
          <Child {...props} />
  </Suspense>
);
