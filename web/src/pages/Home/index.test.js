/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const homeSource = readFileSync(join(currentDir, 'index.jsx'), 'utf8');
const cssSource = readFileSync(join(currentDir, '../../index.css'), 'utf8');

test('homepage source keeps the override flow and simplifies to a single hero', () => {
  expect(homeSource).toContain("const HERO_CAT_IMAGE = ''");
  expect(homeSource).toContain(
    "const DISCORD_INVITE_URL = 'https://discord.gg/z7RrQCz2Gx'",
  );
  expect(homeSource).toContain('shouldShowDefaultHome');
  expect(homeSource).toContain('shouldShowCustomHome');
  expect(homeSource).toContain("className='home-claude-shell'");
  expect(homeSource).toContain("className='home-claude-island'");
  expect(homeSource).toContain("className='home-claude-cat-wrap'");
  expect(homeSource).toContain("to='/console'");
  expect(homeSource).toContain('DISCORD');
  expect(homeSource).not.toContain('CAPABILITY_CARDS');
  expect(homeSource).not.toContain('QUICK_START_STEPS');
  expect(homeSource).not.toContain('MAX_VISIBLE_MODELS');
});

test('homepage css uses the new claude glass classes instead of the old section styles', () => {
  expect(cssSource).toContain('.home-claude-shell');
  expect(cssSource).toContain('.home-claude-hero');
  expect(cssSource).toContain('.home-claude-island');
  expect(cssSource).toContain('.home-claude-cat-placeholder');
  expect(cssSource).toContain('.home-claude-btn-primary');
  expect(cssSource).toContain('.home-claude-btn-secondary');
  expect(cssSource).not.toContain('.home-bento-card');
  expect(cssSource).not.toContain('.home-model-card');
  expect(cssSource).not.toContain('.home-step-item');
});
