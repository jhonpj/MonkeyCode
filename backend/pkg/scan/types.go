package scan

type Position struct {
	Col    int `json:"col"`
	Line   int `json:"line"`
	Offset int `json:"offset"`
}

type Metavar struct {
	AbstractContent string   `json:"abstract_content"`
	End             Position `json:"end"`
	Start           Position `json:"start"`
}

type Metadata struct {
	AbstractFeysh map[string]string `json:"abstract_feysh"`
	Category      string            `json:"category"`
	CategoryFeysh map[string]string `json:"category_feysh"`
	Confidence    string            `json:"confidence"`
	Cwe           any               `json:"cwe,omitempty"`
	FeyshID       string            `json:"feysh_id"`
	Gb            []string          `json:"gb,omitempty"`
	Impact        string            `json:"impact"`
	License       string            `json:"license"`
	MessageZh     string            `json:"message_zh"`
	NameFeysh     map[string]string `json:"name_feysh"`
	Owasp         any               `json:"owasp,omitempty"`
}

type Extra struct {
	EngineKind      string             `json:"engine_kind"`
	Fingerprint     string             `json:"fingerprint"`
	Fix             string             `json:"fix"`
	IsIgnored       bool               `json:"is_ignored"`
	Lines           string             `json:"lines"`
	Message         string             `json:"message"`
	Metadata        Metadata           `json:"metadata"`
	Metavars        map[string]Metavar `json:"metavars"`
	Severity        string             `json:"severity"`
	ValidationState string             `json:"validation_state"`
}

type ResultItem struct {
	CheckID string   `json:"check_id"`
	End     Position `json:"end"`
	Extra   Extra    `json:"extra"`
	Path    string   `json:"path"`
	Start   Position `json:"start"`
}

type Result struct {
	ID      string
	Output  string
	Prefix  string
	Results []*ResultItem `json:"results"`
}
