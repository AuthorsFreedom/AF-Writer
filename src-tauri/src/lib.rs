use specta_typescript::Typescript;
use tauri_specta::{collect_commands, Builder};

#[tauri::command]
#[specta::specta]
fn ping_core(message: String) -> String {
    format!("Core initialized. Echo: {message}")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // 1. Initialize the Specta command registry
    let builder = Builder::<tauri::Wry>::new()
        .commands(collect_commands![ping_core]);

    // 2. Automatically generate TypeScript bindings during development
    #[cfg(debug_assertions)]
    builder
        .export(
            Typescript::default(),
            "../src/core/ipc/bindings.ts",
        )
        .expect("Failed to export TypeScript bindings");

    // 3. Mount handlers into the Tauri runtime
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(builder.invoke_handler())
        .setup(move |app| {
            builder.mount_events(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}