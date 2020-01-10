import { FuseBox, FuseBoxOptions, Sparky } from "fuse-box";
import TsTransformClasscat from "ts-transform-classcat";
import TsTransformInferno from "ts-transform-inferno";
let fuse: FuseBox;
const fuseOptions: FuseBoxOptions = {
   homeDir: "./src",
   output: "dist/$name.js",
   sourceMaps: { inline: false, vendor: false },
   transformers: {
      before: [TsTransformClasscat(), TsTransformInferno()]
   },
   plugins: []
};
const fuseClientOptions: FuseBoxOptions = {
   ...fuseOptions,
   plugins: [
	  // Setup client-side plugins here
      // CSSPlugin()
   ]
};
const fuseServerOptions: FuseBoxOptions = {
   ...fuseOptions
};
Sparky.task("clean", () => {
   Sparky.src("dist")
      .clean("dist")
      .exec();
});
Sparky.task("config", () => {
   fuse = FuseBox.init(fuseOptions);
   fuse.dev();
});
Sparky.task("test", ["&clean", "&config"], () => {
   fuse.bundle("client/bundle").test("[**/**.test.tsx]", null);
});
Sparky.task("client", () => {
   fuse.opts = fuseClientOptions;
   fuse
      .bundle("client/bundle")
      .target("browser@esnext")
      .watch("client/**")
      .hmr()
      .instructions("> client/index.tsx");
});
Sparky.task("server", () => {
   fuse.opts = fuseServerOptions;
   fuse
      .bundle("server/bundle")
      .watch("**")
      .target("server@esnext")
      .instructions("> [server/index.tsx]")
      .completed(proc => {
         proc.require({
            close: ({ FuseBox }) => FuseBox.import(FuseBox.mainFile).shutdown()
         });
      });
});
Sparky.task("dev", ["clean", "config", "client", "server"], () => {
   fuse.run();
});

