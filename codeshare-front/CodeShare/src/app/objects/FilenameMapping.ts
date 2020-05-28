export class FilenameMapping {
    static readonly mapping = {
        c_cpp: "cpp",
        coffee: "coffee",
        csharp: "cs",
        css: "css",
        dockerfile: "dockerfile",
        fortran: "f",
        golang: "go",
        html: "html",
        java: "java",
        javascript: "js",
        json: "json",
        jsp: "jsp",
        kotlin: "",
        markdown: "md",
        php: "php",
        python: "py",
        r: "r",
        ruby: "rb",
        swift: "swift",
        xml: "xml",
        yaml: "yaml",
    }

    static getExtension(type: string): string { return this.mapping[type]; }
}