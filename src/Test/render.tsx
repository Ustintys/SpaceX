import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import type { ReactNode } from 'react';

export function renderWithMantine(ui: ReactNode) {
  return render(
    <MantineProvider>
      {ui}
    </MantineProvider>
  );
}