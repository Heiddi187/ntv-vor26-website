Þetta er React + TS verkefni sem leyfir þér að búa til verkefni og smærri verk inn í þeim
samanstendur af:

-geta búið til og breytt verkefnum
-búa til, breyta og eyða verkum
-verk hafa val um forgang og hvort þeim sé lokið eður ei
-hægt að leita í eða sortera verk
-tölufræði og 'pie-chart' fyrir stöðu verka
-geymist í localStorage (hægt að 'refresh-a' og allt helst inni)
-einingaprufur í Vitest
-notar Storybook
-Endi-í-Enda prufað með Cypress
-CI-Pipeline með GitHub Actions

notast við:
-React
-TypeScript
-Vite
-TailwindCSS
-Vitest
-Storybook
-Cypress
-GitHub Actions

byggt í VS Code og geymt í GitHub

til að setja upp:
git clone https://github.com/Heiddi187/ntv-vor26-website.git
cd skilaverkefni-2
npm install
npm run dev
npm run test -- --run
npm run storybook
npx cypress open