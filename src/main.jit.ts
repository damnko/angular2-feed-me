/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import { enableProdMode } from '@angular/core';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app/app.module';

if (process.env.NODE_ENV === 'production')
  enableProdMode();

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
