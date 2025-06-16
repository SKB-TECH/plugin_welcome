package main.java.com.example;

import org.bukkit.plugin.java.JavaPlugin;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

public class WelcomeJS extends JavaPlugin {
    @Override
    public void onEnable() {
        try {
            ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
            engine.eval("load('" + getDataFolder().toPath().resolve("../scripts/welcome.js") + "')");
        } catch (Exception e) {
            getLogger().severe("Erreur JS: " + e.getMessage());
        }
    }
}