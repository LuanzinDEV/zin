# Design system

## Logo

Use a logo oficial horizontal em PNG sem redesenhar, cortar ou alterar proporcao. Arquivos esperados:

- `assets/brand/zin-logo-horizontal.png`
- `apps/web/public/brand/zin-logo-horizontal.png`

O frontend carrega essa imagem no topo da sidebar e mantem um fallback textual apenas se o arquivo nao estiver disponivel em runtime.

## Paleta

Principal: laranja `#FD5512`, azul-marinho `#18263A`, profundo `#0B1320`, branco `#FFFFFF`.

Tokens light: `#f7f9fc`, `#ffffff`, `#18263a`, `#667085`, `#e6eaf0`, `#fd5512`.

Tokens dark: `#0b1320`, `#111c2d`, `#18263a`, `#f8fafc`, `#cbd5e1`, `#ff6a24`.

Semanticas: success `#22C55E`, warning `#F59E0B`, danger `#EF4444`, info `#3B82F6`.

## Tipografia

Fontes locais via `@fontsource`: Space Grotesk para titulos, Manrope para interface e JetBrains Mono para identificadores.

## Espacamento e raio

Grade em multiplos de 4px. Componentes usam raios entre 12px e 18px, bordas discretas e sombras suaves.

## Componentes

Criados: `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Badge`, `Avatar`, `Tooltip`, `DropdownMenu`, `Dialog`, `Drawer`, `Tabs`, `Card`, `DataTable`, `EmptyState`, `Skeleton`, `Toast`, `PageHeader`, `MetricCard`, `ThemeToggle`, `CommandPalette`, `AppSidebar`.

## Acessibilidade

Controles Radix fornecem foco e semantica base. A UI define foco visivel por `--focus-ring`, respeita `prefers-reduced-motion`, possui dark mode e persiste a preferencia de tema em `localStorage`.
