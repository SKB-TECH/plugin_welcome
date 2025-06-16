var configFile = java.nio.file.Paths.get(plugin.getDataFolder().toString(), "config.json");
var config = {
    welcomeMessage: "&aBienvenue %player% !"
};

function onJoin(e) {
    var msg = config.welcomeMessage
        .replace("%player%", e.getPlayer().getName())
        .replace(/&([0-9a-fk-or])/g, "§$1");
    e.getPlayer().sendMessage(msg);
}

function setWelcome(sender, args) {
    if (!sender.hasPermission("welcomemessage.set")) {
        sender.sendMessage("§cPas de permission !");
        return;
    }
    config.welcomeMessage = args.join(" ");
    java.nio.file.Files.write(configFile, JSON.stringify(config).getBytes());
    sender.sendMessage("§aMessage mis à jour !");
}

plugin.getServer().getPluginManager().registerEvents(new JavaAdapter(org.bukkit.event.Listener, {
    onPlayerJoin: onJoin
}), plugin);

plugin.getCommand("setwelcome").setExecutor(new JavaAdapter(org.bukkit.command.CommandExecutor, {
    onCommand: function(sender, cmd, label, args) {
        setWelcome(sender, args);
        return true;
    }
}));