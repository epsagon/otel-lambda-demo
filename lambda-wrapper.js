const api = require('@opentelemetry/api');
const { BatchSpanProcessor } = require( '@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require( '@opentelemetry/exporter-trace-otlp-http');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
api.diag.setLogger(new api.DiagConsoleLogger(), api.DiagLogLevel.ALL);
const provider = new NodeTracerProvider();
const collectorOptions = {
    url: '<backend_url>'
};
const spanProcessor = new BatchSpanProcessor(new OTLPTraceExporter(collectorOptions));
provider.addSpanProcessor(spanProcessor);
provider.register();
registerInstrumentations({
    instrumentations: [
        getNodeAutoInstrumentations({
            '@opentelemetry/instrumentation-aws-lambda': {
                disableAwsContextPropagation: true
            },
        })
    ],
});
