use specta_typescript::Typescript;
use tauri_specta::{collect_commands, Builder};

#[tauri::command]
#[specta::specta]
fn ping_core(message: String) -> String {
    format!("Core initialized. Echo: {message}")
}

// 1. Single source of truth for command registration
macro_rules! create_specta_builder {
    () => {
        Builder::<tauri::Wry>::new().commands(collect_commands![ping_core])
    };
}

/// 2. Public exporter: Generates TypeScript bindings at `src/core/ipc/bindings.ts`.
/// Callable both during local dev (`run()`) and by CI tests (`tests/export_bindings.rs`).
pub fn export_ts_bindings() {
    let builder = create_specta_builder!();

    builder
        .export(Typescript::default(), "../src/core/ipc/bindings.ts")
        .expect("Failed to export TypeScript bindings");
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Initialize the Specta command registry
    let builder = create_specta_builder!();

    // Automatically generate TypeScript bindings during development
    #[cfg(debug_assertions)]
    export_ts_bindings();

    // Mount handlers into the Tauri runtime
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